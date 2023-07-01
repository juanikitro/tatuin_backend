export interface RequestBody {
  document_number: number;
  document_type: 'DNI' | 'CUIT' | 'CDI' | 'LE' | 'LC' | 'CI Ext.' | 'CUIL' | 'Pasaporte' | 'Otro' | 'Sin Documento' | 'Parto';
  gender: 'F' | 'M';
}
