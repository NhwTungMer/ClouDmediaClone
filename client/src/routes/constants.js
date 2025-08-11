// Application Constants
export const APP_NAME = "CloudMedia Clone";

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// API Response Messages
export const API_MESSAGES = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND: 'Not Found',
  VALIDATION_ERROR: 'Validation Error'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_DATA: 'userData',
  THEME: 'theme'
};

// Default Values
export const DEFAULTS = {
  PAGE_SIZE: 10,
  TIMEOUT: 5000,
  RETRY_ATTEMPTS: 3
};
