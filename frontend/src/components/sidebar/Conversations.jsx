import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../Hooks/useGetConversations';

function Conversations() {
	const {loading,conversations}= useGetConversations();
	console.log(conversations);
  return (
<div className='py-2 flex flex-col overflow-auto'>
			{
				conversations.map((conversation,idx)=>
					<Conversation 
					key={conversation.id}
					conversations={conversation}
					lastIdx={idx ===conversation.length -1}
					/>
				)
			}
                        
		</div>
        )
}

export default Conversations