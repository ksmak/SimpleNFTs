const simpleClient = (instance) => {
    return {
        getProfile() {
            return instance({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `/api/users/get_self/`
            })
        },
        setProfile(data) {
            return instance({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `/api/users/update_self/`,
                data: data
            })
        },
        createArt(formData) {
            return instance({
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                url: `/api/arts/create_art/`,
                data: formData
            })
        }
    }
}

export default simpleClient