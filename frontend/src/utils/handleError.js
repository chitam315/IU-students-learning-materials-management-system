import { message } from 'antd'
import React from 'react'

export const handleError = (error) => {
    if (error.response?.data?.message) {
        message.error(error.response.data.message)
    }
}
