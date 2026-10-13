export type AgencyMeta = {
  catchphrase: string;
  illustration: string;
  description: string;
  groups: string[];
  mv: string;
};

export type AgencyMetaTable = Record<string, AgencyMeta>;
