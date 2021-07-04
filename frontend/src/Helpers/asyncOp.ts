interface PendingAsyncOp {
    status: "pending";
}

interface InProgressAsyncOp {
    status: "in-progress";
}

interface FailedAsyncOp<E> {
    status: "failed";
    error: E;
}

interface SuccessfulAsyncOp<D> {
    status: "successful";
    data: D;
}

interface ReExecutingAsyncOp<D> {
    status: "re-executing";
    data: D;
}

export type AsyncOp<D, E> =
    | PendingAsyncOp
    | InProgressAsyncOp
    | SuccessfulAsyncOp<D>
    | ReExecutingAsyncOp<D>
    | FailedAsyncOp<E>;
