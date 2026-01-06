import { Button, Modal, message } from "antd";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Delete_Movie } from "../../backend/MutateMovie";
import type { DeleteSuccessResponse } from "../../constants/types";
import { QueryMovies } from "../../backend/QueryMovie";
import { useNavigate } from "react-router-dom";

type DeleteMovieProps = {
  id: string;
};

const DeleteMovie = ({ id }: DeleteMovieProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteMovie, { loading }] = useMutation<DeleteSuccessResponse>(
    Delete_Movie,
    {
      update(cache) {
        cache.modify({
          fields: {
            movies(existing) {
              return {
                ...existing,
                data: existing.data.filter(
                  (m: any) => m.__ref !== `Movie:${id}`
                ),
                count: existing.count - 1,
              };
            },
          },
        });
      },
      onCompleted: () => {
        navigate("/movie-list");
      },
      refetchQueries: [
        {
          query: QueryMovies,
          variables: {
            filter: {
              skip: 0,
              limit: 10,
            },
            sort: {
              field: "createdAt",
              order: "DESC",
            },
          },
        },
      ],
    }
  );

  const handleDelete = async () => {
    await deleteMovie({ variables: { id } });
    message.success("Movie deleted successfully");
    setOpen(false);
  };

  return (
    <>
      <Button
        danger
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
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
      >
        Are you sure you want to delete this movie?
      </Modal>
    </>
  );
};

export default DeleteMovie;

// import { Button, Modal, message } from "antd";
// import { useState } from "react";
// import { useMutation } from "@apollo/client/react";
// import { Delete_Movie } from "../../backend/MutateMovie";
// import type { DeleteSuccessResponse } from "../../constants/types";
// import { useNavigate } from "react-router-dom";
// import { QueryMovies } from "../../backend/QueryMovie";

// type DeleteMovieProps = {
//   id: string | undefined;
// };

// const DeleteMovie = ({ id }: DeleteMovieProps) => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const [deleteMovie, { loading, error }] = useMutation<DeleteSuccessResponse>(
//     Delete_Movie,
//     {
//       onCompleted: () => {
//         navigate("/movie-list");
//       },
//       // refetchQueries: [{ query: QueryMovies }],
//     }
//   );

//   const handleDelete = async () => {
//     try {
//       if (!id) return;
//       await deleteMovie({ variables: { id } });

//       message.success("Movie deleted successfully");

//       setOpen(false);
//     } catch {
//       message.error("Failed to delete movie");
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
//         onClick={(e) => {
//           e.stopPropagation();
//           setOpen(true);
//         }}
//       >
//         Delete
//       </Button>

//       <Modal
//         open={open}
//         title="Confirm Delete"
//         onOk={handleDelete}
//         onCancel={() => setOpen(false)}
//         okText="Delete"
//         okButtonProps={{ danger: true }}
//         confirmLoading={loading}
//         cancelButtonProps={{ disabled: loading }}
//         maskClosable={!loading}
//         destroyOnHidden
//       >
//         <p>Are you sure you want to delete this movie?</p>
//         {error && <p className="text-red-600">{error.message}</p>}
//       </Modal>
//     </>
//   );
// };

// export default DeleteMovie;

// // import { Button, Modal, message } from "antd";
// // import { useState } from "react";
// // import { useMutation } from "@apollo/client/react";
// // import { Delete_Movie } from "../backend/MutateData";
// // import type { DeleteProps, DeleteSuccessResponse } from "../constants/types";

// // const DeleteMovie = ({ id }: DeleteProps) => {
// //   const [toDelete, setToDelete] = useState(false);

// //   const [deleteMovie, { loading, error }] =
// //     useMutation<DeleteSuccessResponse>(Delete_Movie);

// //   const handleDelete = async () => {
// //     if (!id) return;

// //     try {
// //       const response = await deleteMovie({
// //         variables: { id },
// //       });

// //       message.success(
// //         `Movie "${response.data?.deleteMovie.data.title}" deleted successfully`
// //       );

// //       setToDelete(false);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <>
// //       <Button
// //         className="m-2"
// //         danger
// //         type="primary"
// //         color="red"
// //         variant="outlined"
// //         onClick={() => setToDelete(true)}
// //       >
// //         Delete Movie
// //       </Button>

// //       <Modal
// //         open={toDelete}
// //         title="Confirm Delete"
// //         onOk={handleDelete}
// //         onCancel={() => setToDelete(false)}
// //         okText="Delete"
// //         okButtonProps={{ danger: true }}
// //         confirmLoading={loading}
// //         cancelButtonProps={{ disabled: loading }}
// //         maskClosable={!loading}
// //         destroyOnHidden
// //       >
// //         <p>Are you sure you want to delete this movie?</p>

// //         {error && <p className="mt-2 text-red-600">{error.message}</p>}
// //       </Modal>
// //     </>
// //   );
// // };

// // export default DeleteMovie;
