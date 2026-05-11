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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_URL}/services/`, {
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

export async function createService(data: Partial<Service>): Promise<Service> {
  const response = await fetch(`${API_URL}/services/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create service');
  return response.json();
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service> {
  const response = await fetch(`${API_URL}/services/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update service');
  return response.json();
}

export async function deleteService(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/services/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete service');
}
