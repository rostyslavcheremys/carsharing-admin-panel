import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip
} from "../../libs/mui.js";

import {
    AddIcon,
    DeleteIcon,
    EditIcon,
    SaveIcon,
    CloseIcon,
} from "../../libs/mui-icons.js";

import { InputController, ImageCell } from "../";

import { formatPrice, getEditMenu } from "../../utils";

export const EditMenuTable = ({
                                  columns = [],
                                  rows = [],
                                  editItem,
                                  newItem,
                                  onEditItem,
                                  onSaveItem,
                                  onCancelEdit,
                                  onDeleteItem,
                                  onStartAddItem,
                                  onCancelAddItem,
                                  onSaveAddItem,
                                  allowAddItem = false,
                                  isAddingNew = false,
                                  controlEdit,
                                  controlNew
                              }) => {

    const safeRows = Array.isArray(rows) ? rows : [];

    return (
        <div className="table">
            <TableContainer className="table__container">
                <Table className="table__table">
                    <TableHead>
                        <TableRow>
                            {columns.map(col => (
                                <TableCell key={col.field} className={`table__cell head ${col.align || ""}`}>
                                    {col.headerName}
                                </TableCell>
                            ))}
                            <TableCell className="table__cell head">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {allowAddItem && isAddingNew && (
                            <TableRow>
                                {columns.map(col => (
                                    <TableCell key={`new-${col.field}`}>
                                        <div className="table__fields">
                                            <InputController
                                                control={controlNew}
                                                name={`new.${col.field}`}
                                                label={col.headerName}
                                                className="table__add-field name"
                                                defaultValue={newItem?.[col.field] ?? ""}
                                                rules={getEditMenu[col.field] ?? {}}
                                            />
                                        </div>
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <div className="table__icon-container">
                                        <IconButton onClick={onSaveAddItem}><SaveIcon /></IconButton>
                                        <IconButton onClick={onCancelAddItem}><CloseIcon /></IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}

                        {!isAddingNew && allowAddItem && (
                            <TableRow>
                                {columns.map(col => <TableCell key={col.field}></TableCell>)}
                                <TableCell>
                                    <div className="table__icon-container">
                                        <IconButton onClick={onStartAddItem}><AddIcon /></IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}

                        {safeRows.map((row, i) => {
                            if (!row) return null;
                            return (
                                <TableRow key={row.id || i}>
                                    {columns.map(col => (
                                        <TableCell key={col.field} className={`table__cell ${col.align || ""}`}>
                                            {editItem === row.id ? (
                                                <div className="table__fields">
                                                    <InputController
                                                        control={controlEdit}
                                                        name={`${row.id}.${col.field}`}
                                                        label={col.headerName}
                                                        className="table__add-field name"
                                                        defaultValue={String(row[col.field] ?? "")}
                                                        rules={getEditMenu[col.field] ?? {}}
                                                    />
                                                </div>
                                            ) : col.field === "description" ? (
                                                <div className="table__fields">
                                                    <Tooltip className="table__tooltip" title={row[col.field] || ""}>
                                                        <div className="table__tooltip-text">
                                                            {row[col.field] ?? "—"}
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            ) : col.field === "image_url" ? (
                                                <ImageCell src={row[col.field]} alt={row.name} />
                                            ) : col.field === "price" || col.field === "total" || col.field === "subtotal" ? (
                                                formatPrice(row[col.field] ?? 0)
                                            ) : (
                                                row[col.field] ?? "—"
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <div className="table__icon-container">
                                            {editItem === row.id ? (
                                                <>
                                                    <IconButton onClick={() => onSaveItem(row)}><SaveIcon /></IconButton>
                                                    <IconButton onClick={() => onCancelEdit()}><CloseIcon /></IconButton>
                                                </>
                                            ) : (
                                                <>
                                                    <IconButton onClick={() => onEditItem(row)}><EditIcon /></IconButton>
                                                    <IconButton onClick={() => onDeleteItem?.(row)}><DeleteIcon /></IconButton>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};