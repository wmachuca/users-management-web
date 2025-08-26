export function formatDate(iso) {
    try {
        if (!iso) return ''
        const d = new Date(iso)
        return d.toLocaleString()
    } catch (_) {
        return iso || ''
    }
}

export function validateEmail(email) {
    if (!email) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
