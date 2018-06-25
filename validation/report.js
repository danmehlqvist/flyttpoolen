module.exports = function validateReportInput(data) {
    const errors = {};
    if (!data.userId) {
        errors.userId = 'userId is required';
    }
    if (!data.date) {
        errors.date = 'date is required';
    }
    if (!data.hours) {
        errors.hours = 'hours is required';
    }
    if (!data.customer) {
        errors.customer = 'customer is required';
    }

    return {
        errors,
        isValid: (Object.keys(errors).length === 0)
    }

}