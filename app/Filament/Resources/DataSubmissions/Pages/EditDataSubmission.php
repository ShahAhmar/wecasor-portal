<?php

namespace App\Filament\Resources\DataSubmissions\Pages;

use App\Filament\Resources\DataSubmissions\DataSubmissionResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditDataSubmission extends EditRecord
{
    protected static string $resource = DataSubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
