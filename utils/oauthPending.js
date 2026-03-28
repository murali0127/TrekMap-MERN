/**
 * @param {string} token - Secure random token
 * @param {object} data - OAuth profile data to store 
*/

const pendingLinks = new Map(); // LATER -> Replace with redis

function setPendingLink(token, data) {
      pendingLinks.set(token, {
            ...data,
            expiresAt: Date.now() + 10 * 60 * 1000 //10 minutes expiry
      });

      //DELETE THE EXPIRES TOKEN & DATA FROM THE MAP
      if (Math.random() > 0.9) {
            const now = Date.now();
            for (const [key, value] of pendingLinks.entries()) {
                  if (value.expiresAt < now) pendingLinks.delete(key);
            }
      }
}

function getPendingLinks(token) {
      const data = pendingLinks.get(token);

      if (!data) {
            return null;
      }

      if (data.expiresAt < Date.now()) {
            deletePendingLinks(token);
            return null
      }
      return data;
}

function deletePendingLinks(token) {
      pendingLinks.delete(token);
}

//CLEAN ALL EXPIRED ENTIRES

function cleanUpEntries() {
      const now = Date.now(); //retuns present date in ms

      for (const [ket, val] of pendingLinks.entries()) {
            if (val.expiresAt < now) {
                  deletePendingLinks(key);
            }
      }

}


module.exports = {
      setPendingLink,
      getPendingLinks,
      deletePendingLinks
}