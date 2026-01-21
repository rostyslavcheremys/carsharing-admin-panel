import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "../../libs/mui.js";

import { formatPrice } from "../../utils";

export const OrderDetailsTable = ({ columns, rows, totalPrice }) => {
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((col) => (
                                    <TableCell key={col.field} className={`table__cell ${col.align || ''}`}>
                                        {col.field === "price" || col.field === "total" || col.field === "subtotal"
                                            ? formatPrice(row[col.field])
                                            : row[col.field]
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell className="table__cell head left total">Total Price</TableCell>
                            <TableCell className="head "/>
                            <TableCell className="head "/>
                            <TableCell className="head "/>
                            <TableCell className="table__cell head total">{formatPrice(totalPrice)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};