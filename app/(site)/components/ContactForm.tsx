"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState, useRef, useEffect } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("meoojpqj");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (state.succeeded) {
    return (
      <p>
        Vielen Dank für Ihre Nachricht! Wir haben Ihre Anfrage erhalten und
        werden uns schnellstmöglich bei Ihnen melden.
      </p>
    );
  }

  const genderOptions = ["Frau", "Herr", "neutral"];

  interface HandleSelectGenderProps {
    option: string;
  }

  const handleSelectGender = (
    option: HandleSelectGenderProps["option"]
  ): void => {
    setSelectedGender(option);
    setDropdownOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formfield">
        <div className="relative w-full" ref={dropdownRef}>
          <div
            className="border-1 px-4 py-2 cursor-pointer w-full flex justify-between items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className={selectedGender ? "" : "text-neutral-400"}>
              {selectedGender || "Anrede"}
            </span>
            <div className="text-neutral-400">
              {dropdownOpen ? <UpOutlined /> : <DownOutlined />}
            </div>
          </div>

          {/* Custom dropdown menu */}
          {dropdownOpen && (
            <div className="absolute flex flex-col gap-2 px-4 py-2 mt-2 top-full left-0 w-full z-10 border-1 border-neutral-800 bg-neutral-100 text-neutral-400">
              {genderOptions.map((option) => (
                <div
                  key={option}
                  className="cursor-pointer hover:text-neutral-800"
                  onClick={() => handleSelectGender(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}

          {/* Hidden input for form submission */}
          <input type="hidden" name="gender" value={selectedGender} />
        </div>
        <ValidationError prefix="Gender" field="gender" errors={state.errors} />
      </div>

      <div className="formfield">
        <input id="name" type="text" name="name" placeholder="Name" />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className="formfield">
        <input id="name" type="text" name="name" placeholder="Vorname" />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className="formfield">
        <input id="email" type="email" name="email" placeholder="E-Mail" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="formfield">
        <textarea
          id="message"
          name="message"
          rows={7}
          placeholder="Ihre Nachricht"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <button type="submit" disabled={state.submitting}>
        senden
      </button>
      <ValidationError errors={state.errors} />
    </form>
  );
}
