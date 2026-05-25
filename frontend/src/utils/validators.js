export const validateItem = (item) => {
    if (!item.name || !item.name.trim()) {
        return { valid: false, error: 'Enter item name' };
    }
    if (item.name.length < 3) {
        return { valid: false, error: 'Name must be at least 3 characters' };
    }
    if (item.name.length > 100) {
        return { valid: false, error: 'Name is too long (max 100 characters)' };
    }
    if (!item.category) {
        return { valid: false, error: 'Select category' };
    }
    if (!item.color || !item.color.trim()) {
        return { valid: false, error: 'Enter color' };
    }
    return { valid: true };
};

export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
