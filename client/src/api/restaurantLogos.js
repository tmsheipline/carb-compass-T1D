const domains = {
  "McDONALD'S":    'mcdonalds.com',
  "BURGER KING":   'burgerking.com',
  "WENDY'S":       'wendys.com',
  "TACO BELL":     'tacobell.com',
  "CHICK-FIL-A":   'chick-fil-a.com',
  "CHIPOTLE":      'chipotle.com',
  "PANERA BREAD":  'panerabread.com',
  "KFC":           'kfc.com',
  "DOMINO'S":      'dominos.com',
  "PIZZA HUT":     'pizzahut.com',
  "DAIRY QUEEN":   'dairyqueen.com',
  "SONIC":         'sonicdrivein.com',
  "JACK IN THE BOX": 'jackinthebox.com',
  "FIVE GUYS":     'fiveguys.com',
  "POPEYES":       'popeyes.com',
  "ARBY'S":        'arbys.com',
  "HARDEE'S":      'hardees.com',
  "CARL'S JR.":    'carlsjr.com',
  "SHAKE SHACK":   'shakeshack.com',
  "CULVER'S":      'culvers.com',
  "WHATABURGER":   'whataburger.com',
  "IN-N-OUT":      'in-n-out.com',
  "STARBUCKS":     'starbucks.com',
  "DUNKIN'":       'dunkin.com',
  "SUBWAY":        'subway.com',
  "PANDA EXPRESS": 'pandaexpress.com',
}

export function getLogoUrl(brandOwner) {
  const domain = domains[brandOwner]
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null
}
