## Demo Video


https://github.com/user-attachments/assets/3873f0c6-5dc0-4f7a-b272-bb5cf52db02c



## Inspiration
With the recent LA wildfires, we noticed how so many people were deprived of the necessary resources to get back on their feet; for some, these resources were unknown to them, and some were even scammed with false advertisements. We believed that if there was a way for people to know their proximity to danger and the closest places they could seek refuge, they could recover and get back on their feet much quicker. Thus, we came up with Shelterfy.


## What it does
Shelterfy displays a map of the user’s current location and displays any wildfires near them, as well as the nearest homeless shelters. Users can search for a specific location, find any wildfires or shelters close to that location, and save any shelters that come up in search results to their accounts. This aimed to ensure that users could check if their loved ones were in danger of being impacted by the wildfire, and if so, direct them to the nearest homeless shelter as soon as possible.

## How we built it
For the frontend, we use the Google Maps API, the Homeless Shelter API, and the NASA EONET API to gather location data of the users, nearby homeless shelters, and wildfires, and display them all with dynamic icons on the map. For the structure of the frontend, we use React, Next.js, and TailwindCSS to provide a stylized experience, and we used Clerk to handle user login and authentication.

For validation of shelter data, we used the Melissa Business and Property APIs as a pipeline to filter out suspicious shelters, ensuring a safe experience for our impacted user base. For the backend, we used a PostgreSQL database hosted on NeonDB to store login info, locations, and saved locations under each user, and Node.js + Express.js to run the server that communicates with the frontend and retrieves info from the database. We used Axios to communicate between these different components.

## Challenges we ran into
- A last-minute switch on the Melissa APIs we leveraged.
- Integrating the Melissa APIs we chose into our application, and finding out a way to get the necessary information fed to them.
- Interpreting the responses from the APIs, and figuring out which information needed to be passed along to the next step
- Maintaining proper communication between the frontend and backend. Properly monitoring API keys in the environment

## Accomplishments that we're proud of
We were able to integrate multiple APIs into a seamless user experience and leverage the Melissa APIs' verification properties to make our application that much more legitimate. We could also overlay coordinate info from multiple places to scale so that nothing was displayed disproportionately. On top of that, we were eventually able to set up solid interfaces between our project’s multiple parts, so that information flowed easily between them. Most importantly, we created an application that helps those most impacted by significant natural disasters find a place to stay and recover.

## What we learned
Managing information from multiple APIs at once requires a whole lot of careful planning.

## What's next for Shelterfy

- Expansion of coverage from just CA -> the US
- Reporting on other common natural disasters in the area (i.e. floods, heavy weather, tornadoes)
- A mobile application/interface for ease of convenience

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started with Shelterfy

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


