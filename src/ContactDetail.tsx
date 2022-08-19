import { useGetContactQuery } from "./services/contactsApi"
    type ContactDetailprops = {
        id:number
    }
  export const ContactDetail = ({id}:ContactDetailprops) => {
    const {data} = useGetContactQuery(id)

    return (
      <pre>{JSON.stringify(data,undefined,2)}</pre>
    )
}