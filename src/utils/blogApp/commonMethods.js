
export function getInitials(user) {
  return user?.firstName
    ?? `${user?.firstName[0]}${user?.maidenName[0]}${user?.lastName[0]}`;
}

export function RenderIf({ children, isTrue, fallback }) {
  return isTrue ? children : fallback || null;
}

export const isSuccess = (response) => response.status >= 200 && response.status <= 299;
