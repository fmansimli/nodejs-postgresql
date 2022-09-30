export class Parser {
  static project(fields: string) {
    const projection = fields
      ? Object.fromEntries(fields.split(",").map(e => [e, true]))
      : {};
    return projection;
  }

  static paginate(total: number, limit = 10, page = 1) {
    const pageCount = Math.ceil(total / limit);
    return {
      total,
      pageCount,
      currentPage: page,
      prevPage: page === 1 ? null : page - 1,
      nextPage: page === pageCount || total == 0 ? null : page + 1,
    };
  }

  static query(query: any) {
    return query as string;
  }

  static merge(fields: string, total: number, limit: number, page: number) {
    const projection = this.project(fields);
    const pagination = this.paginate(total, limit, page);

    return { projection, pagination };
  }
}
