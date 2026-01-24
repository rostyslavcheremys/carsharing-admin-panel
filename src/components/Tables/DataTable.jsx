import { useState } from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    TablePagination,
} from "../../libs/mui.js";

export const DataTable = ({
                              rows = [],
                              columns = [],
                              rowsPerPageOptions = [10, 25, 50],
                          }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const paginated = rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (_, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(0);
    };

    return (
        <Paper className="table__paper">
            <TableContainer className="table__container">
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map(({ id, label }) => (
                                <TableCell key={id} className="table__label">
                                    {label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginated.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    Немає даних
                                </TableCell>
                            </TableRow>
                        )}

                        {paginated.map((row) => (
                            <TableRow hover key={row.id}>
                                {columns.map((column) => {
                                    return (
                                        <TableCell
                                            key={`${row.id}-${column.id}`}
                                            className="table__data">
                                            {column.render
                                                ? column.render(row[column.id], row)
                                                : row[column.id] ?? "—"}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                className="table__pagination"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Записів на сторінці"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}–${to} з ${count}`
                }
            />
        </Paper>
    );
};