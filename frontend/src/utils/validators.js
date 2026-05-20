export const validateItem = (item) => {
    if (!item.name || !item.name.trim()) {
        return { valid: false, error: 'Введите название предмета' };
    }
    if (item.name.length < 3) {
        return { valid: false, error: 'Название должно быть минимум 3 символа' };
    }
    if (item.name.length > 100) {
        return { valid: false, error: 'Название слишком длинное (максимум 100)' };
    }
    if (!item.category) {
        return { valid: false, error: 'Выберите категорию' };
    }
    if (!item.color || !item.color.trim()) {
        return { valid: false, error: 'Введите цвет' };
    }
    return { valid: true };
};

export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
