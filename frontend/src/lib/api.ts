export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMins: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_URL}/services`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}
