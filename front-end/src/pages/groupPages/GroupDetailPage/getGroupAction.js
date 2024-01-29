import axios from 'axios'

export const getGroupAction = async (channelId, setGroupDetail) => {
    try {
        const response = await axios.get(`/channels/${channelId}`)
        // 아래에 setGroupDetail에 받아온 값을 적용해 detail페이지에 전달
    } catch (err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}