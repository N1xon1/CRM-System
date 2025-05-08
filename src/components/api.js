const config = {
    baseUrl:'https://easydev.club/api/v1',
    headers: {
        'Content-Type': 'application/json' 
    }
  }
  
  async function  handleResponse(res) {
      if(!res.ok) {
          throw new Error('Запрос не удался');
      }
      return await res.json();
  }
  
  export async function getTasks() {
    //   const status = 'inWork';
      try { 
          const res = await fetch(`${config.baseUrl}/todos`, {
              headers:config.headers
          })
          return await handleResponse(res)
      } catch (error){
          console.error('Ошибка:', error.message);
      }
  }

  export async function postTask(taskData) {
    try {
        const res = await fetch(`${config.baseUrl}/todos`, {
            headers:config.headers,
            method:'POST',
            body: JSON.stringify({
                title:taskData.title,
                isDone:taskData.isDone
            })
        })
        return await handleResponse(res)
    }catch(error) {
        console.error('Ошибка:', error.message)
    } 
  }

  export async function deleteTask(id) {
    try {
            await fetch(`${config.baseUrl}//todos/${id}`, {
            headers:config.headers,
            method:'DELETE',
        })

    }catch(error) {
        console.error('Ошибка:', error.message)
    } 
  }

  export async function  editingTask(id, taskData) {
    try {
        const res = await fetch(`${config.baseUrl}//todos/${id}`, {
            headers:config.headers,
            method:"PUT",
            body: JSON.stringify({
                title:taskData.title,
                isDone:taskData.isDone
            })
        })
        return await handleResponse(res);
    } catch(error) {console.error('Ошибка', error.message)}
    
  }
const q = await getTasks()
console.log(q)
 
 