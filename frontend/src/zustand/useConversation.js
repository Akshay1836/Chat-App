import {create} from 'zustand';

const useConverstaion=create((set)=>({
        selectedConversation:null,
        setSelectedConversations:(selectedConversation)=>set({selectedConversation}),
        messages:[],
        setMessage:(messages)=>set({messages})
}))

export default useConverstaion