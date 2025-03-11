
/**
 * Security utilities for Supabase interactions
 */

/**
 * Sanitizes input data to prevent SQL injection and XSS attacks
 * @param data The data to sanitize
 * @returns Sanitized data
 */
export const sanitizeInput = (data: any): any => {
  if (typeof data === 'string') {
    // Prevent basic XSS attacks by encoding HTML entities
    return data
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  } else if (typeof data === 'object' && data !== null) {
    // Recursively sanitize objects
    if (Array.isArray(data)) {
      return data.map(item => sanitizeInput(item));
    } else {
      const sanitizedData: Record<string, any> = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          sanitizedData[key] = sanitizeInput(data[key]);
        }
      }
      return sanitizedData;
    }
  }
  return data;
};

/**
 * Validates data against a schema to ensure it matches expected types and formats
 * @param data The data to validate
 * @param schema The schema to validate against
 * @returns Validation result
 */
export const validateDataFormat = (data: any, schema: any): boolean => {
  // Very basic validation - in a real app, use a library like Zod, Joi, or Yup
  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      const expectedType = schema[key];
      
      // Check if required field exists
      if (expectedType.required && (data[key] === undefined || data[key] === null)) {
        return false;
      }
      
      // Check type
      if (data[key] !== undefined && typeof data[key] !== expectedType.type) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Securely wraps Supabase operations with input sanitization and error handling
 * @param operation The Supabase operation function to execute
 * @param data The data to use in the operation
 * @param schema Optional schema for validation
 * @returns Result of the operation
 */
export const secureSupabaseOperation = async (
  operation: (data: any) => Promise<any>,
  data: any,
  schema?: any
): Promise<any> => {
  try {
    // Validate data if schema is provided
    if (schema && !validateDataFormat(data, schema)) {
      throw new Error('Invalid data format');
    }
    
    // Sanitize input data
    const sanitizedData = sanitizeInput(data);
    
    // Execute operation with sanitized data
    return await operation(sanitizedData);
  } catch (error) {
    console.error('Secure operation failed:', error);
    throw error;
  }
};
