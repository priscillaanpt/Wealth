export type HospitalType = {
  id: string;
  name: string;
  location: string;
  benefit: string[];
};

export type updatePrograms = {
  "Biaya Dokter dan Obat-obatan": {
    isChecked: boolean;
    need: number;
    own: number;
  };
  "Kamar dan Layanan": {
    isChecked: boolean;
    need: number;
    own: number;
  };
  "Bedah dan Ruang Operasi": {
    isChecked: boolean;
    need: number;
    own: number;
  };
  "Penyakit Serius (misalnya kanker)": {
    isChecked: boolean;
    need: number;
    own: number;
  };
  "Kompensasi Disabilitas": {
    isChecked: boolean;
    need: number;
    own: number;
  };
  "Kompensasi Pendapatan Harian": {
    isChecked: boolean;
    need: number;
    own: number;
  };
};
