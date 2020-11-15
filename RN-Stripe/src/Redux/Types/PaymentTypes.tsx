export interface PaymentMethodType {
  card: {
    brand: "Visa" | string
    country: string
    exp_month: number
    exp_year: number
  }
  billing_details: {
    address: {
      city: string
      country: string
      postal_code: string
      state: string
      line1: string
      line2: string
    }
    email: string | null
    name: string | null
    phone: string | null
  }
  customer: string
  id: string
  created: number
}
