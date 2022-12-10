enum Category {
  business,
  entertainment,
  general,
  health,
  science,
  sports,
  technology
}

enum Language {
  ar,
  de,
  en,
  es,
  fr,
  he,
  it,
  nl,
  no,
  pt,
  ru,
  sv,
  ud,
  zh
}

enum Country {
  ae, ar, at, au, be, bg, br, ca, ch, cn, co,
  cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, 
  il, in, it, jp, kr, lt, lv, ma, mx, my, ng, 
  nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, 
  sg, si, sk, th, tr, tw, ua, us, ve, za
}

interface Request {
  apiKey: string,
  category?: Category,
  language?: Language,
  country?: Country
}

interface Response {
    status: string,
    sources: [
      {
        id: string,
        name: string,
        description: string,
        url: string,
        category: string,
        language: string,
        country: string
      },
  ]
}


export { Request, Response };