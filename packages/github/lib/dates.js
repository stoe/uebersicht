const formatDate = date =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const getContributionRange = now => {
  const from = new Date(now)
  from.setDate(from.getDate() - 89)

  return {
    from: `${formatDate(from)}T00:00:00`,
    to: `${formatDate(now)}T23:59:59`,
  }
}
