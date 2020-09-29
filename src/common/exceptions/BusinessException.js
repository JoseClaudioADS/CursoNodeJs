class BusinessException extends Error {
  constructor(detail, code) {
    super(detail);
    this.code = code;
  }
}

module.exports = BusinessException;
