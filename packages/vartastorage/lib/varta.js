'use strict'

// eslint-disable-next-line import/no-unresolved
import got from 'got'

import {readFileSync} from 'fs'
import {join} from 'path'

const CREDENTIALS_PATH = join(process.env.PWD, 'vartastorage/credentials.json')
const buf = readFileSync(CREDENTIALS_PATH)
const {user, pwd} = JSON.parse(Buffer.from(buf).toString())

// run
;(async () => {
  try {
    const {
      headers: lh,
      statusCode: ls,
      statusMessage: lst
    } = await got.get('https://www.varta-storage-portal.com/ws/app?func=login', {
      headers: {
        'Accept-Language': 'de',
        'Content-Type': 'application/x-www-form-urlencoded',
        'API-Version': 1,
        Authorization: `Basic ${Buffer.from(`${user}:${pwd}`).toString('base64')}`
      }
    })

    if (ls !== 200) {
      throw new Error(`Varta Storage Portal login failed: ${lst}`)
    }

    const {body} = await got.post('https://www.varta-storage-portal.com/ws/app/?func=status', {
      headers: {
        'Accept-Language': 'de',
        'Content-Type': 'application/json',
        'API-Version': 1,
        'Auth-Token': lh['auth-token']
      },
      body: JSON.stringify({
        serial: `${user}`
      })
    })

    const {Betriebsstatus, Erzeugungsleistung, Energieverbrauch, Ladezustand, Netzeinspeisung, Netzbezug} =
      JSON.parse(body).Daten

    console.log(
      JSON.stringify({
        Betriebsstatus: Betriebsstatus.Name.toLowerCase(),
        Erzeugungsleistung: {
          value: parseInt(Erzeugungsleistung.Wert, 10),
          unit: Erzeugungsleistung.Einheit
        },
        Ladezustand: parseInt(Ladezustand.Wert, 10),
        Energieverbrauch: {
          value: parseInt(Energieverbrauch.Wert, 10),
          unit: Energieverbrauch.Einheit
        },
        Netz: {
          direction: Netzeinspeisung.Wert > 0 ? 'to' : 'from',
          value: Netzeinspeisung.Wert > 0 ? parseInt(Netzeinspeisung.Wert, 10) : parseInt(Netzbezug.Wert, 10),
          unit: Netzeinspeisung.Wert > 0 ? Netzeinspeisung.Einheit : Netzbezug.Einheit
        }
      })
    )
  } catch (error) {
    console.error(error.message)
  }
})()
