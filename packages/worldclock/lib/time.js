const abbreviations = {
  'US/Pacific': {'GMT-8': 'PT', 'GMT-7': 'PDT'},
  'US/Mountain': {'GMT-7': 'MT', 'GMT-6': 'MDT'},
  'US/Central': {'GMT-6': 'CT', 'GMT-5': 'CDT'},
  'US/Eastern': {'GMT-5': 'ET', 'GMT-4': 'EDT'},
  'Europe/London': {GMT: 'GMT', 'GMT+0': 'GMT', 'GMT+1': 'BST'},
  'Europe/Berlin': {'GMT+1': 'CET', 'GMT+2': 'CEST'},
  'Asia/Kolkata': {'GMT+5:30': 'IST'},
  'Australia/Sydney': {'GMT+10': 'AEST', 'GMT+11': 'AEDT'},
}

exports.formatTime = (now, timeZone) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'shortOffset',
  })
  const parts = Object.fromEntries(formatter.formatToParts(now).map(({type, value}) => [type, value]))

  return {
    date: `${parts.day} ${parts.month}`,
    time: `${parts.hour}:${parts.minute}`,
    tz: abbreviations[timeZone]?.[parts.timeZoneName] ?? timeZone ?? formatter.resolvedOptions().timeZone,
  }
}
