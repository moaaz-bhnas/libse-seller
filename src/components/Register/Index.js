import { memo, useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { Input } from "../Input/style";
import { useDispatch } from "react-redux";
import { registerSeller } from "../../redux/actions/sellerRegistrationActions";
import { AuthContext } from "../../contexts/auth";
import styled from "styled-components";
import theme from "../../shared/theme";
import { rectButton } from "../Button/style";
import { title } from "../Title/style";
import useTranslation from "../../hooks/useTranslation";
import translations from "../../translations/strings/register";
import { LocaleContext } from "../../contexts/locale";

const Register = () => {
  // locale
  const { locale } = useContext(LocaleContext);

  // translations
  const { t } = useTranslation();

  const router = useRouter();
  const dispatch = useDispatch();

  const { uid, email } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const seller = {
        uid,
        email,
        firstName,
        lastName,
        phoneNumber,
        storeName,
        address,
        openingHour,
        closingHour,
      };
      dispatch(
        registerSeller({ seller, callback: () => router.push(`/${locale}`) })
      );
    },
    [
      firstName,
      lastName,
      phoneNumber,
      storeName,
      address,
      openingHour,
      closingHour,
    ]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Title>{t(translations, "registerStore")}</Title>

      <PersonalInfo>
        <SubTitle>{t(translations, "personalInfo")}</SubTitle>
        <InputGroup>
          <Input
            half
            type="text"
            aria-label={t(translations, "firstName")}
            placeholder={t(translations, "firstName")}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <Input
            half
            type="text"
            aria-label={t(translations, "surName")}
            placeholder={t(translations, "surName")}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </InputGroup>
        <Input
          type="tel"
          aria-label={t(translations, "phone")}
          placeholder={t(translations, "phone")}
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />
      </PersonalInfo>

      <Hr />

      <ShopInfo>
        <SubTitle>{t(translations, "store")}</SubTitle>
        <Input
          type="text"
          aria-label={t(translations, "storeName")}
          placeholder={t(translations, "storeName")}
          value={storeName}
          onChange={(event) => setStoreName(event.target.value)}
          required
        />
        <Input
          type="text"
          aria-label={t(translations, "address")}
          placeholder={t(translations, "address")}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />
      </ShopInfo>

      <Hr />

      <WorkingHours>
        <SubTitle>{t(translations, "workingHours")}</SubTitle>

        <InputGroup>
          <InputContainer>
            <Label htmlFor="workingHours__from">
              {t(translations, "from")}:
            </Label>
            <Input
              type="time"
              id="workingHours__from"
              value={openingHour}
              onChange={(event) => setOpeningHour(event.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="workingHours__to">{t(translations, "to")}:</Label>
            <Input
              type="time"
              id="workingHours__to"
              value={closingHour}
              onChange={(event) => setClosingHour(event.target.value)}
              required
            />
          </InputContainer>
        </InputGroup>
      </WorkingHours>

      <SubmitButton type="submit">{t(translations, "register")}</SubmitButton>
    </Form>
  );
};

// styles
const Form = styled.form`
  max-width: 30em;
  padding-bottom: 2em;
`;

const Title = styled.h2`
  ${title}
`;

const PersonalInfo = styled.div``;

const SubTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hr = styled.hr`
  margin: 0.5em 0 1em;
  border: 0.5px solid ${theme.border.grey};
`;

const ShopInfo = styled.div``;

const WorkingHours = styled.div`
  margin-bottom: 0.7em;
`;

const InputContainer = styled.div`
  flex: 0 calc(50% - 0.5em);
`;

const Label = styled.label``;

const SubmitButton = styled.button`
  ${rectButton}
`;

export default memo(Register);
