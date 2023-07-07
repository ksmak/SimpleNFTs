const simpleClient = (instance) => {
    return {
        getProfile() {
            return instance({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `/api/users/get_self/`,
                withCredentials: true,
            })
        },
        setProfile(data) {
            return instance({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                url: `/api/users/update_self/`,
                data: data,
                withCredentials: true,
            })
        },
        createArt(formData) {
            return instance({
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                url: `/api/arts/`,
                data: formData,
                withCredentials: true,
            })
        },
        deleteArt(data) {
            return instance({
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `/api/arts/delete_by_image/`,
                data: data,
                withCredentials: true,
            })
        },
    }
}

export default simpleClient