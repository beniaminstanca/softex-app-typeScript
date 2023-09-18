export type Offer = {
    id: string;
    nume: string;
    data: string;
    prenume: string;
    tipAsigurare: string;
    marcaMasina?: string;
    anFabricatie?: string;
    nrInmatriculare?: string;
    serieSasiu: string;
    nrKm: string;
  };
  
  export type OffersData = {
    offers: Offer[];
    counter: number;
  };
  
  export type OfferDetail = {
    offer:Offer[]
  }