const pad = value => String(value).padStart(2, '0')

exports.formatTime = now => ({
  date: `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`,
  time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
})
