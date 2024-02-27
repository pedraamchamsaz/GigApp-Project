import axios from "axios";
const url =  "http://localhost:3001/";
//"https://gigapp.onrender.com/"

export class ApiClient {
  // the constructor function takes in two callback functions which change the state in the page.js.
  // the page.js is where the state is stored so the functions we callback have to be there.
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }

  async authenticatedCall(method, url, data) {
    console.log(data)
    return await axios({
      method,
      url,
      headers: {
        // returns the token which we then check on the backend to see if there is a user
        // in the db that has that token
        authorization: this.tokenProvider(),
      },
      data,
    }).catch((error) => {
      console.log(error)
      if (error.response.status === 403) {// 403 indicates that the user is not logged in 
        // therefore we call the logouthandler function and clear the local storage and the state
        this.logoutHandler();
        return Promise.reject();
      } else {
        throw error;
      }
    });
  }

// fetch events without authentication 
async nonAuthenticatedCall(method, url, data) {
  return await axios({
    method,
    url,
    data,
  }).catch((error) => {
    console.log(error)
    if (error.response.status === 405) {
    } else {
      throw error;
    }
  });
}



  async getEvents() {
    console.log("Get events - call api")
    return await this.authenticatedCall("get", url);
  }

  // new func to fetch all events
  async getAllEvents() {
    console.log("Get all database events - call api")
    return await this.nonAuthenticatedCall("get", `${url}events`);
  }

  // // fetch events saved by user
  // async getSavedEvents() {
  //  return await this.authenticatedCall("get", `${url}username/events`);
  // }

  // // update user's saved events array (replaces array with new array)
  // async updateSavedEvents(events) {
  //  return await this.authenticatedCall("put", `${url}username/events`, { events });
  // }


  addEvent(name, city, date, price, time, photo, venue, countrycode, postcode, currency, price2, ticketlink) {
    console.log("addEvent Api Client called")
    return this.authenticatedCall("post", url, { name, city, date, price, time, photo, venue, countrycode, postcode, currency, price2, ticketlink });
  }


  removeEvent(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateEvent(id, name, city, date, price, time, photo, venue, countrycode, postcode, currency, price2, ticketlink) {
    console.log(`Calling Update: ${id}`)
    return this.authenticatedCall("put", `${url}${id}`, { name, city, date, price, time, photo, venue, countrycode, postcode, currency, price2, ticketlink });
  }

  async login(username, password) {
    console.log("SIGNED UP USER NOW TRIYNG TO LOG IN")

    return this.authenticatedCall("post", `${url}auth`, {username, password});
  }

  async signUp(username, password) {
    console.log('CALLED SIGN UP CALL')

    return this.authenticatedCall("post", `${url}signup`, {username, password});
  }

  async checkUsername(userDetails) {
    console.log("Checking username in database")
    console.log(userDetails)
    return this.authenticatedCall('get', `${url}username/${userDetails.username}`);
  }



// new api calls \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async addInterestedEvent(eventId) {
  try {
    await this.authenticatedCall(
      "post",
      `${url}addInterestedEvent`,
      { eventId }
    );
    console.log("Event bookmarked successfully");
  } catch (error) {
    console.error("Error bookmarking event:", error);
    throw error;
  }
}

async getInterestedEvents() {
  try {
    return await this.authenticatedCall("get", `${url}interestedEvents`);
  } catch (error) {
    console.error("Error fetching interested events:", error);
    throw error;
  }
}

// updateUserEvents(savedEvents)
//     return this.authenticatedCall("put", `${url}username/savedEvents`, { savedEvents });


async removeInterestedEvent(eventId) {
  try {
    await this.authenticatedCall(
      "post",
      `${url}removeInterestedEvent`,
      { eventId }
    );
    console.log("Event removed from bookmarks successfully");
  } catch (error) {
    console.error("Error removing event from bookmarks:", error);
    throw error;
  }
}


// isEventBookmarked code

async isEventBookmarked(eventId) {
  try {
    const response = await this.authenticatedCall(
      "get",
      `${url}isEventBookmarked/${eventId}`
    );
    const bookmarked = response.data.bookmarked; 
    console.log("Bookmark status for event", eventId, ":", bookmarked); // Log bookmark status
    return bookmarked;
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    throw error;
  }
}


async getLoggedUsername() {
  try {
    const response = await this.authenticatedCall("get", `${url}loggedUsername`);
    const username = response.data.username;
    console.log("Logged username:", username); // Log the logged username
    return username;
  } catch (error) {
    console.error("Error fetching logged username:", error);
    throw error;
  }
}


// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
}