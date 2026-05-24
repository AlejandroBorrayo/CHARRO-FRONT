"use client";

import { useEffect, useRef } from "react";
import {
  formatBirthDate,
  formatDateTime,
  formatFullName,
  formatGender,
  formatRole,
} from "@/lib/userFormatters";
import type { UserCollectionInterface } from "@/type/user.interface";

type UserDetailModalProps = {
  user: UserCollectionInterface | null;
  onClose: () => void;
};

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (user) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [user]);

  function handleClose() {
    onClose();
  }

  if (!user) return null;

  const fields = [
    { label: "Nombre completo", value: formatFullName(user) },
    { label: "Correo electrónico", value: user.email },
    { label: "WhatsApp", value: user.whatsapp || "—" },
    { label: "Fecha de nacimiento", value: formatBirthDate(user.birth_date) },
    { label: "Género", value: formatGender(user.gender) },
    { label: "No. Pasaporte", value: user.no_passport || "—" },
    { label: "Rol", value: formatRole(user.role) },
    { label: "Primer inicio de sesión", value: user.loggin_first_time ? "Sí" : "No" },
    { label: "Estado", value: user.deleted ? "Eliminado" : "Activo" },
    { label: "Registrado", value: formatDateTime(user.created_at) },
    { label: "Última actualización", value: formatDateTime(user.updated_at) },
  ];

  return (
    <dialog
      ref={dialogRef}
      className="charro-admin__modal"
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div className="charro-admin__modal-content">
        <div className="charro-admin__modal-header">
          <h3 className="charro-admin__section-title">Detalle del usuario</h3>
          <button
            type="button"
            className="charro-admin__modal-close"
            onClick={handleClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <dl className="charro-admin__detail-grid">
          {fields.map((field) => (
            <div key={field.label} className="charro-admin__detail-field">
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>

        <div className="charro-admin__modal-footer">
          <button type="button" className="btn-charro-outline" onClick={handleClose}>
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
}
