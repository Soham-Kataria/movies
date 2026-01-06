import { Button, Modal, message } from "antd";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import type { DeletePersonResponse } from "../../constants/types";
import { Delete_Person } from "../../backend/MutatePerson";
import { useNavigate } from "react-router-dom";

type DeletePersonProps = {
  id: string | undefined;
};

const DeletePerson = ({ id }: DeletePersonProps) => {
  const [open, setOpen] = useState(false);

  const [deletePerson, { loading, error }] =
    useMutation<DeletePersonResponse>(Delete_Person);

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      if (!id) return;

      await deletePerson({
        variables: { id },
        refetchQueries: ["Persons"],
      });

      message.success("Person deleted successfully");

      setOpen(false);
      navigate("/person-list");
    } catch {
      message.error("Failed to delete person");
    }
  };

  return (
    <>
      <Button
        // className="m-2"
        danger
        type="primary"
        color="red"
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <Modal
        open={open}
        title="Confirm Delete"
        onOk={handleDelete}
        onCancel={() => setOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        confirmLoading={loading}
        cancelButtonProps={{ disabled: loading }}
        maskClosable={!loading}
        destroyOnHidden
      >
        <p>Are you sure you want to delete this movie?</p>
        {error && <p className="text-red-600">{error.message}</p>}
      </Modal>
    </>
  );
};

export default DeletePerson;

// import { Button, Modal, message } from "antd";
// import { useState } from "react";
// import { useMutation } from "@apollo/client/react";
// import { Delete_Person } from "../backend/MutateData";
// import type { DeleteProps, DeletePersonResponse } from "../constants/types";

// const DeletePerson = ({ id }: DeleteProps) => {
//   const [toDelete, setToDelete] = useState(false);

//   const [deletePerson, { loading, error }] =
//     useMutation<DeletePersonResponse>(Delete_Person);

//   const handleDelete = async () => {
//     if (!id) return;

//     try {
//       const response = await deletePerson({
//         variables: { id },
//       });

//       message.success(
//         `Movie "${response.data?.deletePerson.data.title}" deleted successfully`
//       );

//       setToDelete(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <Button
//         className="m-2"
//         danger
//         type="primary"
//         color="red"
//         variant="outlined"
//         onClick={() => setToDelete(true)}
//       >
//         Delete Movie
//       </Button>

//       <Modal
//         open={toDelete}
//         title="Confirm Delete"
//         onOk={handleDelete}
//         onCancel={() => setToDelete(false)}
//         okText="Delete"
//         okButtonProps={{ danger: true }}
//         confirmLoading={loading}
//         cancelButtonProps={{ disabled: loading }}
//         maskClosable={!loading}
//         destroyOnHidden
//       >
//         <p>Are you sure you want to delete this movie?</p>

//         {error && <p className="mt-2 text-red-600">{error.message}</p>}
//       </Modal>
//     </>
//   );
// };

// export default DeletePerson;
