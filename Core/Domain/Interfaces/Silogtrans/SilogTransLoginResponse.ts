export interface SilogTransLoginResponse {
  usuario: SilogTransUser;
  token: string;
}

export interface SilogTransUser {
  usuario_codigo: string;
  usuario_nombre: string;
  usuario_cambioclave: boolean;
  empresa_nombre: string;
  empresa_codigo_cs: string;
  tercero_codigo: string;
  tercero_nombre: string;
  tercero_tipo: string[];
}
