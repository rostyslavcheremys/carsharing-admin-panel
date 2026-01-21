import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "../../libs/mui.js";

import {
    AddIcon,
    RemoveIcon,
    DeleteIcon
} from "../../libs/mui-icons.js";

import { formatPrice, getDiscountPrice } from "../../utils";

export const CartTable = ({ columns, rows, totalPrice, onIncrease, onDecrease, onRemove, onClear }) => {
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
                        {rows.map((row) => {
                            const hasDiscount = row.discount > 0 && row.discount <= 100;
                            const finalPrice = getDiscountPrice(row.price, row.discount);

                            return(
                                <TableRow key={row.id}>
                                    {columns.map((col) => (
                                        <TableCell key={col.field} className={`table__cell ${col.align || ''}`}>
                                            {col.field === "quantity" ? (
                                                <div className="table__icon-container">
                                                    <IconButton className="table__button-icon" onClick={() => onDecrease(row.id)}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <span className="table__quantity">{row.quantity}</span>
                                                    <IconButton className="table__button-icon" onClick={() => onIncrease(row.id)}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </div>
                                            ) : col.field === "price" ? (
                                                formatPrice(hasDiscount ? finalPrice : row.price)
                                            ) : col.field === "total" ? (
                                                formatPrice((hasDiscount ? finalPrice : row.price) * row.quantity)
                                            ) : (
                                                row[col.field]
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <div className="table__icon-container">
                                            <IconButton onClick={() => onRemove(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <TableCell className="table__cell head left total">Total Price</TableCell>
                            <TableCell className="head "/>
                            <TableCell className="head "/>
                            <TableCell className="head "/>
                            <TableCell className="table__cell head total">{formatPrice(totalPrice)}</TableCell>
                            <TableCell>
                                <div className="table__icon-container">
                                    <IconButton onClick={onClear}>
                                        <DeleteIcon className="table__icon total" />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};