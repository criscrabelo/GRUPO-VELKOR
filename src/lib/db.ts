export interface Testimonial {
  id: string
  feedback_text: string
  rating: number
  client_name: string
  image?: string
  position?: string
}

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    feedback_text:
      'Excelente serviço, superaram todas as minhas expectativas. Recomendo fortemente.',
    rating: 5,
    client_name: 'João Silva',
    position: 'Empresário',
  },
  {
    id: '2',
    feedback_text:
      'A assessoria foi fundamental para fechar um ótimo negócio com total segurança e praticidade.',
    rating: 5,
    client_name: 'Maria Oliveira',
    position: 'Investidora',
  },
  {
    id: '3',
    feedback_text:
      'Comprar meu primeiro imóvel em leilão só foi possível graças à equipe. Muito obrigado!',
    rating: 5,
    client_name: 'Carlos Mendes',
    position: 'Servidor Público',
  },
]

export const db = {
  testimonials: {
    findMany: async (): Promise<Testimonial[]> => {
      return mockTestimonials
    },
  },
}
