import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import Loader from "react-loader-spinner";

import DashboardContainer from "../../../components/Dashboard/DashboardContainer/DashboardContainer";
import FormInputFile from "../../../components/Dashboard/Forms/AdForm/FormInputFile/FormInputFile";
import FormInputText from "../../../components/Dashboard/Forms/AdForm/FormInputText/FormInputText";
import PageTitle from "../../../components/Dashboard/PageTitle/PageTitle";
import BtnBlue from "../../../components/Dashboard/Buttons/BtnBlue/BtnBlue";
import LocationModal from "../../../components/Dashboard/Modals/LocationModal/LocationModal";
import FormInputLocation from "../../../components/Dashboard/Forms/AdForm/FormInputLocation/FormInputLocation";
import FormContainer from "../../../components/Dashboard/Forms/AdForm/FormContainer/FormContainer";
import RadioContainer from "../../../components/Dashboard/Forms/AdForm/RadioContainer/RadioContainer";
import CreateAddModal from "components/Dashboard/Modals/CreateAddModal/CreateAddModal";

import {
	dropAllData,
	changeAddInfo,
	changeDisplayType,
	changeName,
	changeDetailsLink,
	changeCategory,
} from "../../../redux/slices/createAndEditAdSlice/createAndEditAdSlice";
import { selectAdFormState } from "../../../redux/slices/createAndEditAdSlice/createAndEditAdSelectors";
import { closeCreateAdModal, openCreateAdModal } from "redux/slices/dashboardSlice/dashboardSlice";
import { uploadDisplayType, uploadFile } from "../../../components/Dashboard/utils/formFileUpload";
import { displayType } from "../../../components/Dashboard/utils/displayTypes";

import { validateForm } from "./validateForm";
import { selectAdCategories } from "redux/slices/dashboardSlice/dashboardSelectors";

// import styles from "./CreateAd.module.scss";

const CreateAd = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectAdFormState);
	const categories = useAppSelector(selectAdCategories);
	const [btnLoading, setBtnLoading] = useState(false);

	useEffect(() => {
		dispatch(dropAllData({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const submit = (event: any) => {
		event.preventDefault();
		setBtnLoading(true);

		try {
			validateForm(state);
		} catch (error: any) {
			alert(error.message);
			setBtnLoading(false);
			return;
		}

		dispatch(openCreateAdModal());
		// dispatch(submitAdd(defaultPayment))
		// 	.unwrap()
		// 	.then(() => {
		// 		history.push(ROUTES.dashboard.ads);
		// 	})
		// 	.catch((err) => setBtnLoading(false));
	};

	const closeAdModal = () => {
		setBtnLoading(false);
		dispatch(closeCreateAdModal());
	};

	return (
		<DashboardContainer xPadding>
			<LocationModal />
			<CreateAddModal close={() => closeAdModal()} />
			<PageTitle>Create Advertisement</PageTitle>
			<FormContainer>
				<FormInputText
					label="Name"
					placeholder="Piloto Brasil"
					input={state.name}
					onChange={(payload) => dispatch(changeName(payload))}
				/>

				<FormInputFile
					label="Logo"
					placeholder={state.logo_name}
					onChange={(event: any) => uploadFile(event, dispatch)}
				/>

				<FormInputText
					label="Description"
					placeholder="Materiais de estudo para avaliação"
					input={state.additional_info}
					onChange={(payload) => dispatch(changeAddInfo(payload))}
				/>

				<FormInputText
					label="Link (past here)"
					placeholder="https://example.com"
					input={state.details_link ? state.details_link : ""}
					onChange={(payload) => dispatch(changeDetailsLink(payload))}
				/>

				<Form.Group as={Row} className="mb-3 ms-0" controlId="categorySelect">
					<Form.Label column sm="3">
						Category
					</Form.Label>
					<Col sm="9">
						<Form.Select
							aria-label="Category Select"
							value={state.category}
							onChange={(event: any) => dispatch(changeCategory(event.target.value))}
						>
							{categories.map((category) => (
								<option value={category.id}>{category.label}</option>
							))}
						</Form.Select>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3 ms-0" controlId="displayType">
					<Form.Label column sm="3">
						Type
					</Form.Label>
					<Col sm="9">
						<Form.Select
							aria-label="Display Type"
							value={state.display_type}
							onChange={(event: any) =>
								dispatch(changeDisplayType(event.target.value))
							}
						>
							<option value={displayType.DISPLAY}>Display</option>
							<option value={displayType.BANNER}>Banner</option>
							<option value={displayType.VIDEO}>Video</option>
						</Form.Select>
					</Col>
				</Form.Group>

				<FormInputLocation />

				<FormInputFile
					label="Banner or Video"
					placeholder={state.display_file_name}
					onChange={(event: any) =>
						uploadDisplayType(event, dispatch, state.display_type)
					}
					disabled={state.display_type === displayType.DISPLAY}
				/>

				<RadioContainer />

				<BtnBlue onClick={(event) => submit(event)} disabled={btnLoading}>
					{btnLoading ? (
						<Loader type="Oval" color="white" height={40} width={40} />
					) : (
						"Save"
					)}
				</BtnBlue>
			</FormContainer>
		</DashboardContainer>
	);
};

export default CreateAd;
