import  React from 'react';
/*OFFICIAL NOTES ON THIS PAGE:
this file is initialising Context (global state that can then be accessed in many components & files) .
This file is imported to GlobalState.js and there is implemented with Context.Provider to all App Components.
DATA shd be fetched there and it will be accessible to whole app.
*/
export default React.createContext({
    username: 'default username',

})