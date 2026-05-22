"use client";

import Image from "next/image";

export const WHATSAPP_CHANNEL_URL =
  "https://whatsapp.com/channel/0029VbD29mv7tkizXWWjDE2q";
export const WHATSAPP_QR_IMAGE_URL =
  "https://i.postimg.cc/BvNqph0n/Captura-de-pantalla-2026-05-22-a-la(s)-3-41-16-p-m.png";

type CharroCommunityInviteProps = {
  showQuote?: boolean;
  showNextButton?: boolean;
  onNext?: () => void;
};

export function CharroCommunityInvite({
  showQuote = true,
  showNextButton = false,
  onNext,
}: CharroCommunityInviteProps) {
  return (
    <div className="charro-welcome">
      {showQuote && (
        <blockquote className="charro-welcome__quote">
          &ldquo;Mi ofrenda al mundo es México: compartiré toda la riqueza de nuestra
          cultura contigo.&rdquo;
          <cite>— El Charro González</cite>
        </blockquote>
      )}

      <div className="charro-welcome__grid">
        <div className="charro-welcome__qr-card">
          <p className="charro-welcome__qr-label">Canal oficial en WhatsApp</p>
          <div className="charro-welcome__qr-frame">
            <Image
              src={WHATSAPP_QR_IMAGE_URL}
              alt="Código QR del canal de WhatsApp de El Charro González"
              width={220}
              height={220}
              className="charro-welcome__qr-img"
              unoptimized
            />
          </div>
          <p className="charro-welcome__qr-hint">
            Escanea con tu cámara o WhatsApp
          </p>
        </div>

        <div className="charro-welcome__actions">
          <h3 className="charro-welcome__actions-title">
            Forma parte de la comunidad
          </h3>
          <p className="charro-welcome__actions-text">
            Recibe novedades, tradiciones y momentos especiales directamente en tu
            celular. Únete a quienes celebran la mexicanidad con orgullo.
          </p>
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-charro !w-auto text-center"
          >
            Unirme por enlace
          </a>
          <p className="charro-welcome__link-note">
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charro-gold underline-offset-2 hover:underline"
            >
              Abrir canal en WhatsApp
            </a>
          </p>
          {showNextButton && onNext && (
            <button
              type="button"
              onClick={onNext}
              className="btn-charro-outline mt-4 w-full py-3 text-center sm:mt-6"
            >
              Siguiente →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
