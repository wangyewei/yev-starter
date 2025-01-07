const AllowedFileSuffixes = ['xls', 'xlsx', 'docs', 'pdf'] as const
export type FileSuffix = (typeof AllowedFileSuffixes)[number]
