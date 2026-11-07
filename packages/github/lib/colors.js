const palettes = {
  gray: {
    light: ['#e4ebe6', '#c4ccc6', '#96a199', '#58635b'],
    dark: ['#c4ccc6', '#7c8980', '#353d37', '#191f1b'],
  },
  blue: {
    light: ['#bcecff', '#5fb9ff', '#0377ff', '#0040a7'],
    dark: ['#a2daff', '#3094ff', '#0a50db', '#082a8f'],
  },
  yellow: {
    light: ['#ffe777', '#fabf21', '#be7d00', '#824800'],
    dark: ['#f7d162', '#db9d00', '#a06100', '#653200'],
  },
  red: {
    light: ['#ffcecb', '#ff8182', '#cf2230', '#860620'],
    dark: ['#feb2ae', '#fc5c5d', '#d31231', '#860620'],
  },
  purple: {
    light: ['#dbbffd', '#b870ff', '#8534f3', '#43179e'],
    dark: ['#d3b3fe', '#a665f9', '#6619e1', '#26115f'],
  },
  pink: {
    light: ['#ffc9f2', '#ff80d2', '#ef2aa4', '#952866'],
    dark: ['#fcabe7', '#ed55ba', '#ca2186', '#741550'],
  },
  coral: {
    light: ['#ffcab8', '#ff7b56', '#e13f1b', '#a22710'],
    dark: ['#fdb7a1', '#f66945', '#c53211', '#801e0f'],
  },
  lemon: {
    light: ['#f5e36b', '#e1c50f', '#a98906', '#614d01'],
    dark: ['#f9e76a', '#e4c411', '#a98906', '#654d02'],
  },
  lime: {
    light: ['#e8fc97', '#d1f441', '#92c219', '#425e13'],
    dark: ['#dcff96', '#b1e119', '#608a10', '#22360b'],
  },
  teal: {
    light: ['#a4efe8', '#39dad2', '#197b7b', '#024b4d'],
    dark: ['#99f1e8', '#26ede2', '#0bbab6', '#047172'],
  },
  indigo: {
    light: ['#d4dbff', '#8e9df7', '#4956e5', '#262dae'],
    dark: ['#b3c1fd', '#6a7df0', '#2d3dd7', '#212183'],
  },
}

const contributionLevels = {
  FIRST_QUARTILE: 0,
  SECOND_QUARTILE: 1,
  THIRD_QUARTILE: 2,
  FOURTH_QUARTILE: 3,
}

const getLuminance = color => {
  const [red, green, blue] = [1, 3, 5]
    .map(offset => parseInt(color.slice(offset, offset + 2), 16) / 255)
    .map(channel => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4))

  return red * 0.2126 + green * 0.7152 + blue * 0.0722
}

const getTextColor = color => {
  const background = getLuminance(color) + 0.05
  const lightContrast = (getLuminance('#f2f5f3') + 0.05) / background
  const darkContrast = background / (getLuminance('#101411') + 0.05)

  if (Math.max(lightContrast, darkContrast) < 4.5) {
    return 1.05 / background > background / 0.05 ? '#ffffff' : '#000000'
  }

  return lightContrast > darkContrast ? '#f2f5f3' : '#101411'
}

export const getContributionColors = ({weeks, isHalloween}, colorScheme = 'default') => {
  const palette = !isHalloween && Object.hasOwn(palettes, colorScheme) ? palettes[colorScheme] : undefined

  return weeks.flatMap(({contributionDays}) =>
    contributionDays.map(({color, contributionCount, contributionLevel}) => {
      const defaultColor = color === '#ebedf0' ? 'transparent' : color === '#03001c' ? '#c46212' : color
      const level = contributionLevels[contributionLevel]
      const backgroundColor = palette
        ? contributionLevel === 'NONE'
          ? 'transparent'
          : (palette.light[level] ?? defaultColor)
        : defaultColor
      const darkColor = palette
        ? contributionLevel === 'NONE'
          ? 'transparent'
          : (palette.dark[level] ?? defaultColor)
        : undefined
      const includeTextColor = contributionLevel === 'FOURTH_QUARTILE' || (palette && contributionLevel !== 'NONE')

      return {
        color: backgroundColor,
        count: contributionCount || '',
        ...(palette ? {darkColor} : {}),
        ...(includeTextColor
          ? {
              textColor: getTextColor(backgroundColor),
              ...(palette ? {darkTextColor: getTextColor(darkColor)} : {}),
            }
          : {}),
      }
    }),
  )
}
