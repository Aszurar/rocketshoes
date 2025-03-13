enum WINDOW_SIZES {
  xs = 390,
  sm = 640,
  md = 768,
  lg = 1024,
}

enum COLUMNS_COUNT {
  xs = 1,
  sm = 2,
  md = 3,
  lg = 4,
}

enum STOCK_ALERT_STATUS {
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  LIMIT_REACHED = 'LIMIT_REACHED',
  ERROR = 'ERROR',
  EMPTY = 'EMPTY',
}

export { COLUMNS_COUNT, STOCK_ALERT_STATUS, WINDOW_SIZES }
