import { SetMetadata } from '@nestjs/common';
import { Sidebar } from './types/sidebar';

export const doctorSidebar: Sidebar[] = [
  {
    name: 'Dashboard',
    icon: 'Home',
    href: '/dashboard',
  },
  {
    name: 'Citas',
    icon: 'Calendar',
    href: '/dashboard/appt',
    subMenu: [
      {
        name: 'Eventos',
        href: '/dashboard/appt/events',
      },
      {
        name: 'Disponibilidad',
        href: '/dashboard/appt/availability',
      },
    ],
  },
];

export const adminSidebar: Sidebar[] = [
  { name: 'Inicio', href: '/dashboard', icon: 'Home' },
  {
    name: 'Salones',
    href: '/dashboard/classrooms',
    icon: 'School',
  },
  { name: 'Materias', href: '/dashboard/subjects', icon: 'BookText' },
  { name: 'Mensajes', href: '/dashboard/messages', icon: 'MessagesSquare' },
  { name: 'Profesores', href: '/dashboard/teachers', icon: 'Users' },
];

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
