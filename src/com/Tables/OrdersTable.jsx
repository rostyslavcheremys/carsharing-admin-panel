import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "../../libs/mui.js";

import { VisibilityIcon } from "../../libs/mui-icons.js";

export const OrdersTable = ({ columns, rows, onViewOrder }) => {
    return (
        <div className="table">
            <TableContainer className="table__container">
                <Table className="table__table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.field} className={`table__cell head ${col.align || ''}`}>
                                    {col.headerName}
                                </TableCell>
                            ))}
                            <TableCell className="table__cell head">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((col) => (
                                    <TableCell key={col.field} className={`table__cell ${col.align || ''}`}>
                                        {row[col.field]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <div className="table__icon-container">
                                        <IconButton onClick={() => onViewOrder(row)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};