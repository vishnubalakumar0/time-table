/**
 * LocalStorage utility functions
 */
export const Storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Storage get error:', error);
            return null;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Storage set error:', error);
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Storage remove error:', error);
        }
    }
};

/**
 * Initialize default data
 */
export const initializeData = () => {
    if (!Storage.get('classes')) {
        Storage.set('classes', []);
    }

    if (!Storage.get('staff')) {
        Storage.set('staff', [
            { 
                id: 1, 
                name: 'Admin', 
                username: 'admin', 
                password: 'admin123', 
                role: 'admin' 
            },
            { 
                id: 2, 
                name: 'Dr. Alice Smith', 
                username: 'alice', 
                password: 'staff123', 
                role: 'staff',
                freePeriodMode: 'manual',
                manualFreePeriods: 5
            },
            { 
                id: 3, 
                name: 'Student User', 
                username: 'student', 
                password: 'student123', 
                role: 'student',
                className: ''
            }
        ]);
    }

    if (!Storage.get('subjects')) {
        Storage.set('subjects', []);
    }

    if (!Storage.get('timetable')) {
        Storage.set('timetable', null);
    }
};